---
title: "Visual Basic Methods in C#"
date: 2022-10-30
categories: [programming]
draft: false
---

A friend of mine needed some legacy code, written in VB6, ported to work in C# (.NET 6 / Core). This code used several Visual Basic functions that have equivalents in C#, but those versions didn't yield the same output given the same input. Using the [Microsoft.VisualBasic](https://www.nuget.org/packages/Microsoft.VisualBasic/) package got the code closer to working, but still wasn't 100% what was needed. It turns out that package is used for porting VB.Net code, not legacy VB6 or earlier code.

Some methods had fairly close equivalents in C#, others were way off the mark due to string encoding differences.

A lot of searching and unit testing later, I came up with this class of functions that allowed the legacy code to be ported with fairly minimal changes. My goal was to copy + paste VB6 code and make as few a changes as possible. Here are the methods covered:

 - Mid
 - Len
 - Int
 - Divide (while not an actual VB function, this replaces the C# `/` operator so output is the same as Visual Basic 6 would have produced)
 - Chr
 - Asc

<!--more-->
## Usage

For this to work, you must install the [`System.Text.Encoding.CodePages`](https://www.nuget.org/packages/System.Text.Encoding.CodePages) Nuget package. This provides the needed Windows-1252 string encoding that isn't available in .NET Core.

Once added to your own code, usage is as simple as prefixing the above supported VB methods in your C# with `VB.`. Like so:

```csharp
var output = VB.Mid("Mid Function Demo", 1, 3); // output = Mid
```

## Helper Class

```csharp
/// <summary>
/// Helper class with familiar Visual Basic methods. Avoid unless legacy code conversions demands such arcane behaviors.
/// Always attempt to refactor into normal C# methods first...
/// In these methods, all arrays start at index 1. Behaviors should match VB6 and operate using Windows-1252 encoding.
/// </summary>
public static class VB
{
    /// <summary>
    /// Returns a string containing a specified number of characters from a string. First character is at index 1.
    /// </summary>
    /// <param name="input">String expression from which characters are returned. If string contains Null, Null is returned.</param>
    /// <param name="start">Character position in string at which the part to be taken begins. If start is greater than the number of characters in string, Mid returns a zero-length string ("").</param>
    /// <param name="length">Number of characters to return. If omitted or if there are fewer than length characters in the text (including the character at start), all characters from the start position to the end of the string are returned.</param>
    /// <returns></returns>
    public static string Mid(string input, int start, int? length)
    {
        if (input == null)
        {
            return null;
        }

        var inputLength = input.Length;
        if (start > inputLength)
        {
            return String.Empty;
        }

        if (length.HasValue)
        {
            return input.Substring(start - 1, length.Value);
        }

        return input.Substring(start - 1);
    }

    /// <summary>
    /// Returns the number of characters in a string
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static int Len(string input)
    {
        return input.Length;
    }

    /// <summary>
    /// Converts a float to an int
    /// </summary>
    /// <param name="value"></param>
    /// <returns></returns>
    public static int Int(float value)
    {
        if (value > 0)
        {
            return (int)value;
        }

        return (int)Math.Round(value, 0, MidpointRounding.AwayFromZero);
    }

    /// <summary>
    /// Divides 2 numbers, returning a float. Replaces the VB / operator which operates differently than the C# / operator
    /// </summary>
    /// <param name="x"></param>
    /// <param name="y"></param>
    /// <returns></returns>
    public static float Divide(int x, int y)
    {
        return (float)x / (float)y;
    }

    /// <summary>
    /// Returns a string containing the character associated with the specific character code
    /// </summary>
    /// <param name="charCode"></param>
    /// <returns></returns>
    public static string Chr(int charCode)
    {
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        var legacyEncoding = Encoding.GetEncoding(1252);

        return legacyEncoding.GetString(new[] { (byte)charCode });
    }

    /// <summary>
    /// Returns an intenger representing the character code corresponding to the first letter in a string
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static int Asc(string input)
    {
        Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        var legacyEncoding = Encoding.GetEncoding(1252);

        var bytes = legacyEncoding.GetBytes(new char[] { input[0] });
        var converted = (int)legacyEncoding.GetChars(bytes)[0];

        if (converted >= 128)
        {
            // Strings.Asc is not equivalent with a plain C# cast for non ASCII chars that can go beyond 127 code value.
            // See https://social.msdn.microsoft.com/Forums/vstudio/en-US/13fec271-9a97-4b71-ab28-4911ff3ecca0/equivalent-in-c-of-asc-amp-chr-functions-of-vb?forum=csharpgeneral
            var buffer = new byte[2];
            // if the resulting conversion is 1 byte in length, just use the value
            if (legacyEncoding.GetBytes(new char[] { input[0] }, 0, 1, buffer, 0) == 1)
            {
                converted = buffer[0];
            }
            else
            {
                // byte swap bytes 1 and 2;
                converted = (buffer[0] << 16 | buffer[1]);
            }
        }

        return converted;
    }
}

```

Find this useful? Want the unit tests? Let me know. I figured posting these methods would meet a lot of folks' needs who may not care about having the unit tests, so wanted to make them available without waiting any longer.
