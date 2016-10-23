---
layout: post
title: "SharePoint 2010: Observations and Revelations on the User Profile Sync Service and the Update-SPProfilePhotoStore cmdlet"
date: 2012-01-20 13:46
author: Jon Badgett

categories: [SharePoint]
---
These are my notes while trying to diagnose and better understnad some issues and oddities with the SharePoint 2010 User Profile Service Application.

If you're wanting to populate pictures into people's profiles, you'll be using the Update-SPProfilePhotoStore powershell cmdlet after a normal sync (full or incremental - or your custom built one). This cmdlet is in the Microsoft.Office.Server.UserProfiles dll, specifically the Microsoft.Office.Server.UserProfiles.PowerShell.SPCmdletUserProfilePhotoStore class. Thanks to the goodness that is <a href="http://www.reflector.net/">Redgate Reflector</a> (a must have for any SP developer), we can get a more clear undertanding of what the cmdlet is doing. I've written some comments to help understand what's going on, as well as renamed some variables for the section I was more interested in understanding. You'll want to open the code in a new window (highlight on the top right of the code section), as some of the lines are quite long:

[sourcecode lang="csharp"]
[Cmdlet(&quot;Update&quot;, &quot;SPProfilePhotoStore&quot;)]
internal sealed class SPCmdletUserProfilePhotoStore : SPCmdlet
{
    // Fields
    private bool? m_createThumbnailsForImportedPhotos = null;
    private bool? m_noDelete = null;
    private SPFolder m_profilePicFolder;
    private SPSitePipeBind m_SiteMySiteHost;
    private UserProfileManager m_userProfileManager;

    // Constructor
    public SPCmdletUserProfilePhotoStore()
    {
        this.m_createThumbnailsForImportedPhotos = null;
        this.m_noDelete = null;
    }

    // Methods
    protected override void InternalProcessRecord()
    {
        // Run the below section if -CreateThumbnailsForImportedPhotos has NOT been specified.
        if (!this.m_createThumbnailsForImportedPhotos.HasValue)
        {
            // Enumerate through all UserProfiles
            foreach (UserProfile profile in this.m_userProfileManager)
            {
                try
                {
                    // Get the PictureURL property of the user profile
                    object obj2 = profile[&quot;PictureURL&quot;].Value;
                    if ((obj2 != null) &amp;&amp; !string.IsNullOrEmpty((string) obj2))
                    {
                        // This user has a PictureURL property. Get the path
                        string path = profile[&quot;PictureURL&quot;].Value.ToString();
                        string format = StringResourceManager.GetString(&quot;Powershell_MovePictures_GenericError_Text&quot;);
                        format = string.Format(CultureInfo.InvariantCulture, format, new object[] { path, (string) profile[&quot;AccountName&quot;].Value });

                        // If the PictureURL property has a link to the medium thumbnail, don't process further.
                        if (!Path.GetFileNameWithoutExtension(path).EndsWith(&quot;_MThumb&quot;, StringComparison.Ordinal))
                        {
                            bool flag = false;
                            byte[] buffer = null;
                            try
                            {
                                using (SPSite site = new SPSite(path))
                                {
                                    using (SPWeb web = site.RootWeb)
                                    {
                                        // Try and get a reference to the file specified. This can be in SharePoint somewhere on on another webserver.
                                        SPFile file = web.GetFile(path);
                                        if (file.Exists)
                                        {
                                            try
                                            {
                                                buffer = file.OpenBinary();
                                            }
                                            catch (Exception exception)
                                            {
                                                base.WriteError(new SPException(format + exception.ToString()), ErrorCategory.WriteError, null);
                                                buffer = null;
                                            }
                                        }
                                        else
                                        {
                                            // The file doesn't exist. Write an error.
                                            string str4 = StringResourceManager.GetString(&quot;Powershell_MovePictures_FileNotFound_Text&quot;);
                                            str4 = string.Format(CultureInfo.CurrentCulture, str4, new object[] { path });
                                            base.WriteError(new FileNotFoundException(format + str4), ErrorCategory.WriteError, null);
                                        }
                                    }
                                }
                            }
                            catch (FileNotFoundException)
                            {
                                // File wasn't found using Object Model. Maybe it's on another webserver. Try and open the file using a WebClient instead of the Object Model
                                try
                                {
                                    WebClient client = new WebClient();
                                    CredentialCache cache = new CredentialCache();
                                    cache.Add(new Uri(path), &quot;Ntlm&quot;, CredentialCache.DefaultNetworkCredentials);
                                    client.Credentials = cache;
                                    buffer = client.DownloadData(new Uri(path));
                                }
                                catch (Exception exception2)
                                {
                                    base.WriteError(new SPException(format + exception2.ToString()), ErrorCategory.WriteError, null);
                                    buffer = null;
                                }
                            }
                            string str5 = null;
                            // Did we read the file into memory?
                            if (buffer != null)
                            {
                                string str7 = UrlUtility.ConvertToLegalFileName(profile[&quot;AccountName&quot;].Value.ToString(), '_');
                                string str8 = &quot;.jpg&quot;;
                                try
                                {
                                    using (MemoryStream stream = new MemoryStream(buffer))
                                    {
                                        using (Bitmap bitmap = new Bitmap(stream, true))
                                        {
                                            // Create a large thumbnail
                                            UserProfilePhotos.CreateThumbnail(bitmap, UserProfilePhotos.LargeThumbnailSize, UserProfilePhotos.LargeThumbnailSize, this.m_profilePicFolder, str7 + &quot;_LThumb&quot; + str8);
                                            // Create a medium thumbnail
                                            SPFile file2 = UserProfilePhotos.CreateThumbnail(bitmap, UserProfilePhotos.MediumThumbnailSize, UserProfilePhotos.MediumThumbnailSize, this.m_profilePicFolder, str7 + &quot;_MThumb&quot; + str8);
                                            // Create a small thumbnail
                                            UserProfilePhotos.CreateThumbnail(bitmap, UserProfilePhotos.SmallThumbnailSize, UserProfilePhotos.SmallThumbnailSize, this.m_profilePicFolder, str7 + &quot;_SThumb&quot; + str8);
                                            // Get a URL to the Medium Size Thumbnail
                                            str5 = UrlUtility.EnsureTrailingSlash(this.m_userProfileManager.MySiteHostUrl) + file2.Url;
                                        }
                                    }
                                }
                                catch (Exception exception3)
                                {
                                    base.WriteError(new SPException(format + exception3.ToString()), ErrorCategory.WriteError, null);
                                    flag = true;
                                }
                            }
                            // If the URL to the medium thumbnail isn't null and we successfully created the thumbnails...
                            if ((str5 != null) &amp;&amp; !flag)
                            {
                                // Set the PictureURL value
                                profile[&quot;PictureURL&quot;].Value = str5;
                                profile.Commit();
                                // Write to the log (verbose) that we set the Picture up.
                                string str9 = StringResourceManager.GetString(&quot;Powershell_MovePictures_PhotoMoved_Text&quot;);
                                str9 = string.Format(CultureInfo.InvariantCulture, str9, new object[] { profile[&quot;AccountName&quot;].ToString(), DateTime.Now.ToLongTimeString() });
                                base.WriteVerbose(str9);
                            }
                        }
                    }
                }
                catch (Exception exception4)
                {
                    string str10 = StringResourceManager.GetString(&quot;Powershell_MovePictures_GenericError_Text&quot;);
                    str10 = string.Format(CultureInfo.InvariantCulture, str10, new object[] { string.Empty, (string) profile[&quot;AccountName&quot;].Value });
                    base.WriteError(new SPException(str10 + exception4.ToString()), ErrorCategory.WriteError, null);
                }
            }
        }
        // Run the below section if -CreateThumbnailsForImported has been specified
        else
        {
            // Get the MySiteHost Site Collection
            using (SPSite site2 = new SPSite(this.m_userProfileManager.MySiteHostUrl))
            {
                // Access the MySiteHost RootWeb
                using (SPWeb web2 = site2.RootWeb)
                {
                    // Get the PhotoListURL
                    string importPhotoListUrl = UserProfileGlobal.GetImportPhotoListUrl(ProfileType.User) + &quot;/&quot; + UserProfileGlobal.GetImportPhotoFolderName(web2.Locale) + &quot;/&quot;;
                    // Enumerate through all UserProfiles
                    foreach (UserProfile profile2 in this.m_userProfileManager)
                    {
                        // Get the filename of the photo, then the url to the photo, and finally the file itself
                        // This is a combination of the UserProfileManager PartitionID (internal property) and the RecordId of the profile. This is the temporary picture file.
                        string importPhotoFilename = UserProfileGlobal.GetImportPhotoFilename(this.m_userProfileManager, profile2.RecordId);
                        string importPhotoFilenameWithListUrl = importPhotoListUrl + importPhotoFilename;
                        SPFile file3 = web2.GetFile(importPhotoFilenameWithListUrl);

                        // If the file exists, run below.
                        if ((file3 != null) &amp;&amp; file3.Exists)
                        {
                            // Format an error message in case we need it later.
                            string str15 = StringResourceManager.GetString(&quot;Powershell_MovePictures_GenericError_Text&quot;);
                            str15 = string.Format(CultureInfo.InvariantCulture, str15, new object[] { file3.ToString(), (string) profile2[&quot;AccountName&quot;].Value });

                            // Try opening the file and reading it into memory
                            byte[] buffer2 = null;
                            try
                            {
                                buffer2 = file3.OpenBinary();
                            }
                            catch (Exception exception5)
                            {
                                // There was an exeption reading the picture file into memory. Write this error to a log, then set the buffer to null
                                base.WriteError(new SPException(str15 + exception5.ToString()), ErrorCategory.WriteError, null);
                                buffer2 = null;
                            }

                            // Check and see if we were able to read the file into memory successfully. Run below if we could.
                            if (buffer2 != null)
                            {
                                // We've got the temporary file in memory. Determine what we should rename it
                                string str17 = profile2[&quot;AccountName&quot;].Value.ToString().Replace(@&quot;\&quot;, &quot;_&quot;);
                                string str18 = &quot;.jpg&quot;;
                                string mediumThumbnailURL = null;
                                bool createThumbnailsSuccess = true;
                                try
                                {
                                    using (MemoryStream stream2 = new MemoryStream(buffer2))
                                    {
                                        using (Bitmap bitmap2 = new Bitmap(stream2, true))
                                        {
                                            // Create a Thumbnail - large size
                                            UserProfilePhotos.CreateThumbnail(bitmap2, UserProfilePhotos.LargeThumbnailSize, UserProfilePhotos.LargeThumbnailSize, this.m_profilePicFolder, str17 + &quot;_LThumb&quot; + str18);
                                            // Create a Thumbanil - medium size, and get a reference to the file it creates
                                            SPFile file4 = UserProfilePhotos.CreateThumbnail(bitmap2, UserProfilePhotos.MediumThumbnailSize, UserProfilePhotos.MediumThumbnailSize, this.m_profilePicFolder, str17 + &quot;_MThumb&quot; + str18);
                                            // Create a Thumbnail - small size
                                            UserProfilePhotos.CreateThumbnail(bitmap2, UserProfilePhotos.SmallThumbnailSize, UserProfilePhotos.SmallThumbnailSize, this.m_profilePicFolder, str17 + &quot;_SThumb&quot; + str18);
                                            // Build a URL that points to the medium size thumbnail
                                            mediumThumbnailURL = this.m_userProfileManager.MySiteHostUrl + file4.Url;
                                        }
                                    }
                                }
                                catch (Exception exception6)
                                {
                                    base.WriteError(new SPException(str15 + exception6.ToString()), ErrorCategory.WriteError, null);
                                    createThumbnailsSuccess = false;
                                }
                                // Have we successfully created the thumbnails and have a path to the medium thumbnail?
                                if (createThumbnailsSuccess &amp;&amp; (mediumThumbnailURL != null))
                                {
                                    // Set the PictureURL property
                                    profile2[&quot;PictureURL&quot;].Value = mediumThumbnailURL;
                                    profile2.Commit();
                                    // If -NoDelete wasn't specified, then delete the image with the Guid_ID pattern for this user profile.
                                    if (!this.m_noDelete.HasValue || (this.m_noDelete == false))
                                    {
                                        file3.Delete();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    protected override void InternalValidate()
    {
        SPSite site = this.MySiteHostLocation.Read();
        if (site == null)
        {
            string message = StringResourceManager.GetString(&quot;Powershell_MovePictures_NullMySiteHost_Text&quot;);
            base.ThrowTerminatingError(new ArgumentException(message), ErrorCategory.InvalidArgument, null);
        }
        SPServiceContext serviceContext = SPServiceContext.GetContext(site);
        if (serviceContext == null)
        {
            string str2 = StringResourceManager.GetString(&quot;Powershell_MovePictures_ServerContextNotFound_Text&quot;);
            base.ThrowTerminatingError(new ArgumentException(str2), ErrorCategory.ObjectNotFound, null);
        }
        this.m_userProfileManager = new UserProfileManager(serviceContext);
        if (this.m_userProfileManager == null)
        {
            string str3 = StringResourceManager.GetString(&quot;Powershell_MovePictures_ProfManagerNotFound_Text&quot;);
            base.ThrowTerminatingError(new ArgumentException(str3), ErrorCategory.ObjectNotFound, null);
        }
        if (!this.m_userProfileManager.IsProfileAdmin)
        {
            string str4 = StringResourceManager.GetString(&quot;Powershell_MovePictures_NotProfileAdmin_Text&quot;);
            base.ThrowTerminatingError(new ArgumentException(str4), ErrorCategory.InvalidOperation, null);
        }
        try
        {
            this.m_profilePicFolder = UserProfileGlobal.GetOrCreatePictureFolder(this.m_userProfileManager);
        }
        catch (Exception exception)
        {
            base.ThrowTerminatingError(exception, ErrorCategory.ObjectNotFound, null);
        }
    }

    // Properties
    [Parameter(Mandatory=false)]
    public bool CreateThumbnailsForImportedPhotos
    {
        get
        {
            return this.m_createThumbnailsForImportedPhotos.Value;
        }
        set
        {
            this.m_createThumbnailsForImportedPhotos = new bool?(value);
        }
    }

    [ValidateNotNull, Parameter(Mandatory=true, ValueFromPipeline=true)]
    public SPSitePipeBind MySiteHostLocation
    {
        get
        {
            return this.m_SiteMySiteHost;
        }
        set
        {
            this.m_SiteMySiteHost = value;
        }
    }

    [Parameter(Mandatory=false)]
    public bool NoDelete
    {
        get
        {
            return this.m_noDelete.Value;
        }
        set
        {
            this.m_noDelete = new bool?(value);
        }
    }
}

[/sourcecode]

From this we gather that the command has two modes depending on whether the -CreateThumbnailsForImportedPhotos flag is specified.

<strong>CreateThumbnailsForImportedPhotos specified</strong>

This mode appears intended for those who are importing their pictures from Active Directory (or other source) as a raw picture (Octet String for AD) in bytes.

<strong>CreateThumbnailsForImportedPhotos not specified</strong>

This mode appears intended for the use cases where the PictureURL property has been prepopulated with a URL that either points to an image in SharePoint or an image available on another web server. This mode still will create thumbnails for you, but it doesn't look for the temporary pictures in the form {GUID}_ID to make the thumbnails from - it will try and access the picture located at the URL specified in the PictureURL property.

So - if you're importing your pictures from Active Directory and a user removes their picture from the directory, there is no means in the powershell (or observed from the import process) to take care of removing the picture from SharePoint.

I'll post more as more is learned. There doesn't seem to be much information on some of these things.
