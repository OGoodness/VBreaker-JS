// Playfair Cipher

// This code was written by Tyler Akins and is placed in the public domain.
// It would be nice if this header remained intact.  http://rumkin.com

// Requires util.js


// Performs a Playfair cipher on the passed-in text
// encdec = -1 for decode, 1 for encode
// text = the text to encode/decode
// skip = the letter omitted from the 5x5 grid
// skipto = what the "skip" letter should be replaced with
// key = the word or phrase used to generate letter placement in the 5x5 grid
// flags = 0x01 : Double letters are unencoded
function Playfair(encdec, text, skip, skipto, key, flags)
{
   var enc, out, bet, otemp, c;
   
   if (typeof(skip) != 'string' || skip.length != 1 || 
       skip.toUpperCase() < 'A' || skip.toUpperCase() > 'Z')
      skip = "J";
   skip = skip.toUpperCase();
   
   if (typeof(skipto) != 'string' || skipto.length != 1 || 
       skipto.toUpperCase() < 'A' || skipto.toUpperCase() > 'Z')
      skipto = "I";
   skipto = skipto.toUpperCase();

   if (skip == skipto)
   {
      skipto = String.fromCharCode(skip.charCodeAt(0) + 1);
      if (skipto > 'Z')
         skipto = 'A';
   }
   
   if (typeof(key) != 'string')
      key = "";
   
   key = MakeKeyedAlphabet(skip + key);
   key = key.slice(1, key.length);
   
   enc = '';
   out = '';
   bet = '';
   for (var i = 0; i < text.length; i ++)
   {
      c = text.charAt(i).toUpperCase();
      if (c == skip)
         c = skipto;
	 
      if (key.indexOf(c) >= 0)
      {
         if (text.charAt(i) != text.charAt(i).toUpperCase())
	    enc += c.toLowerCase();
	 else
	    enc += c;
	 if (enc.length == 2)
	 {
	    otemp = Playfair_Lookup(encdec, enc, key, flags);
	    out += otemp.charAt(0) + bet + otemp.charAt(1);
	    bet = '';
	    enc = '';
	 }
      }
      else
      {
         if (enc.length > 0)
	 {
	    bet += text.charAt(i);
	 }
	 else
	 {
	    out += text.charAt(i);
	 }
      }
   }
   if (enc.length > 0)
   {
      otemp = Playfair_Lookup(encdec, enc + 'X', key);
      out += otemp.charAt(0) + bet + otemp.charAt(1);
   }
   
   return out;
}


// Performs the substitution of a single letter pair block
function Playfair_Lookup(encdec, chars, key, flags)
{
   var t1, t2, u1, u2, r1, r2, c1, c2;
      
   t1 = chars.charAt(0);
   t2 = chars.charAt(1);
      
   u1 = 0;
   if (t1 != t1.toUpperCase())
   {
      t1 = t1.toUpperCase();
      u1 = 1;
   }
   u2 = 0;
   if (t2 != t2.toUpperCase())
   {
      t2 = t2.toUpperCase();
      u2 = 1;
   }
      
   c1 = key.indexOf(t1);
   r1 = Math.floor(c1 / 5);
   c1 = c1 % 5;
   
   c2 = key.indexOf(t2);
   r2 = Math.floor(c2 / 5);
   c2 = c2 % 5;
   
   if (r1 == r2 && c1 == c2)
   {
      // Same letter
      if ((flags & 0x01) == 0)
      {
         r1 += encdec;
         r2 += encdec;
         c1 += encdec;
         c2 += encdec;
      }
   }
   else if (r1 == r2)
   {
      // Same row
      c1 += encdec;
      c2 += encdec;
   }
   else if (c1 == c2)
   {
      // Same column
      r1 += encdec;
      r2 += encdec;
   }
   else
   {
      // Rectangle
      var a;
      a = c1;
      c1 = c2;
      c2 = a;
   }
   

   r1 = (r1 + 5) % 5;
   r2 = (r2 + 5) % 5;
   c1 = (c1 + 5) % 5;
   c2 = (c2 + 5) % 5;
   
   t1 = key.charAt(r1 * 5 + c1);
   t2 = key.charAt(r2 * 5 + c2);
   
   if (u1)
      t1 = t1.toLowerCase();
   if (u2)
      t2 = t2.toLowerCase();
   
   return t1 + t2;
}

document.Playfair_Loaded = 1;
