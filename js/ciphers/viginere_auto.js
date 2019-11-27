// Vigenere text cipher

// Code written by Tyler Akins and placed in the public domain.
// It would be nice if you left this header intact.  http://rumkin.com

// Requires util.js


// Vigenere encrypt text
// encdec = 1 to encode, -1 to decode
// text = the text you want to encode
// pass = the password to use
// key = the key to make a keyed alphabet (or leave it blank)
function Vigenere(encdec, text, pass, key, autokey)
{
   var s, b, i;
   
   // Change the pass into A-Z only
   pass = OnlyAlpha(pass.toUpperCase());
   
   // Change the key into a keyed alphabet
   key = MakeKeyedAlphabet(key);
   
   s = "";
   for (i = 0; i < text.length; i++)
   {
      b = text.charAt(i);
      limit = ' ';
      if (b >= 'A' && b <= 'Z')
         limit = 'A';
      if (b >= 'a' && b <= 'z')
         limit = 'a';
      if (limit != ' ' && pass.length)
      {
         b = b.toUpperCase();
	 
         // Handle autokey
	 if (autokey && encdec > 0)
	    pass += b;
	    
         // Just ignore the non-alpha characters from the cipher
         bval = key.indexOf(b) + encdec * key.indexOf(pass.charAt(0));
	 bval = (bval + 26) % 26;
	 b = key.charAt(bval);
	 
	 // Handle autokey
	 if (autokey && encdec < 0)
	    pass += b;
	 
	 if (limit == 'a')
	    b = b.toLowerCase();
	    
	 // Rotate the password
	 if (! autokey)
	    pass += pass.charAt(0);
	 
	 pass = pass.slice(1, pass.length);
      }
      s += b;
   }
   return s;
}

function BuildTableau(k, n)
{
   var Alpha = MakeKeyedAlphabet(k);
   var AtoZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   var s = "<tt><b><u>&nbsp;&nbsp;|&nbsp;" + 
      Alpha.substr(0, 4) + '&nbsp;' +
      Alpha.substr(4, 4) + '&nbsp;' +
      Alpha.substr(8, 4) + '&nbsp;' +
      Alpha.substr(12, 4) + '&nbsp;' +
      Alpha.substr(16, 4) + '&nbsp;' +
      Alpha.substr(20, 4) + '&nbsp;' +
      Alpha.substr(24, 2) + "</u></b>";
   
   if (! n)
   {
      n = 26;
   }
   
   for (var i = 0; i < n; i ++)
   {
      s += '<br><b>' + Alpha.charAt(0) + '</b>&nbsp;|&nbsp;' +
         Alpha.substr(0, 4) + '&nbsp;' +
         Alpha.substr(4, 4) + '&nbsp;' +
         Alpha.substr(8, 4) + '&nbsp;' +
         Alpha.substr(12, 4) + '&nbsp;' +
         Alpha.substr(16, 4) + '&nbsp;' +
         Alpha.substr(20, 4) + '&nbsp;' +
         Alpha.substr(24, 2);
      Alpha += Alpha.charAt(0);
      Alpha = Alpha.substr(1);
   }
   s += "</tt>";
   return s;
}

function GronsfeldToVigenere(p)
{
   var out = '';
   var i;
   var Alpha = 'ABCDEFGHIJ';
   
   for (i = 0; i < p.length; i ++)
   {
      var c = p.charAt(i);
      if (c >= '0' && c <= '9')
      {
         out += Alpha.charAt(c - '0');
      }
   }
   
   return out;
}
   

document.Vigenere_Loaded = 1;