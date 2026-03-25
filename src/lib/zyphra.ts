export const B64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

export const ZYPH_CONSONANTS = [
  "kr", "zx", "th", "vr", "qx", "ph", "ch", "sh", "zh", "kh", "gh", "rh", "tz", "cz", "sz", "xz",
  "kv", "zv", "tv", "vv", "qv", "pv", "cv", "sv", "fv", "gv", "rv", "lv", "mv", "nv", "bv", "dv",
  "kw", "zw", "tw", "vw", "qw", "pw", "cw", "sw", "fw", "gw", "rw", "lw", "mw", "nw", "bw", "dw",
  "kl", "zl", "tl", "vl", "ql", "pl", "cl", "sl", "fl", "gl", "rl", "ml", "nl", "bl", "dl", "jl",
  "xk"
];

export const ZYPH_VOWELS = [
  "a", "e", "i", "o", "u", "y",
  "aa", "ae", "ai", "ao", "au", "ay",
  "ea", "ee", "ei", "eo", "eu", "ey",
  "ia", "ie", "ii", "io", "iu", "iy",
  "oa", "oe", "oi", "oo", "ou", "oy",
  "ua", "ue", "ui", "uo", "uu", "uy",
  "ya", "ye", "yi", "yo", "yu", "yy",
  "ar", "er", "ir", "or", "ur", "yr",
  "al", "el", "il", "ol", "ul", "yl",
  "am", "em", "im", "om", "um", "ym",
  "an", "en", "in", "on", "un"
];

export const SEPARATORS = [".", "_", "~", "*"];

export function encodeZyphra(data: any): string {
  const jsonStr = JSON.stringify(data);
  const utf8Bytes = new TextEncoder().encode(jsonStr);
  const binString = Array.from(utf8Bytes, (byte) => String.fromCharCode(byte)).join("");
  const base64 = btoa(binString);
  
  let result = "ZYPH-";
  for (let i = 0; i < base64.length; i += 2) {
    const char1 = base64[i];
    const char2 = base64[i + 1]; // Base64 length is always even, so char2 is always defined
    
    const idx1 = B64_CHARS.indexOf(char1);
    const idx2 = B64_CHARS.indexOf(char2);
    
    const consonant = ZYPH_CONSONANTS[idx1];
    const vowel = ZYPH_VOWELS[idx2];
    
    result += consonant + vowel;
    
    if (i < base64.length - 2) {
      const sep = SEPARATORS[Math.floor(Math.random() * SEPARATORS.length)];
      result += sep;
    }
  }
  result += "-END";
  return result;
}

export function decodeZyphra(zyphra: string): any {
  if (!zyphra.startsWith("ZYPH-") || !zyphra.endsWith("-END")) {
    throw new Error("Formato ZyphraCode inválido");
  }
  
  const core = zyphra.slice(5, -4);
  const words = core.split(/[._~*]/);
  
  let base64 = "";
  for (const word of words) {
    if (word.length < 3) throw new Error("Longitud de palabra inválida");
    const consonant = word.slice(0, 2);
    const vowel = word.slice(2);
    
    const idx1 = ZYPH_CONSONANTS.indexOf(consonant);
    const idx2 = ZYPH_VOWELS.indexOf(vowel);
    
    if (idx1 === -1 || idx2 === -1) throw new Error("Sílaba Zyphra no reconocida");
    
    base64 += B64_CHARS[idx1] + B64_CHARS[idx2];
  }
  
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  const jsonStr = new TextDecoder().decode(bytes);
  
  return JSON.parse(jsonStr);
}
