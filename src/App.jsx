import React from 'react';
import { deflateSync, strFromU8, strToU8 } from 'fflate'; // For fflate
import { compressToUTF16 as lzCompress, decompressFromUTF16 as lzDecompress } from 'lz-string'; // For LZ-String
import pako from 'pako'; // For Pako
import {
  deflateSync as zlibDeflate
} from 'react-zlib-js'
import QRCode from 'qrcode.react'; // For QR Code generation

const App = () => {
  // Example test string
  const testString = `First line with max 125 characters here
${Array.from({ length: 20 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 40) + 1).join(',')).join('\n')}`;

  // fflate compression
  console.time('fflate')
  const fflateCompressed = strFromU8(deflateSync(strToU8(testString)));
  console.timeEnd('fflate')
  
  // LZ-String compression (already a string, but still encode to Base64 for consistency)
  console.time('lz')
  const lzStringCompressed = lzCompress(testString);
  console.timeEnd('lz')
  
  // Pako compression
  console.time('pako')
  const pakoCompressed = strFromU8(pako.deflate(testString));
  console.timeEnd('pako')
  
  // Pako compression
  console.time('zlib')
  const zlibCompressed = zlibDeflate(testString);
  console.timeEnd('zlib')

  return (
    <>
      <h2>Compression and QR Code Generation Test</h2>
      <p>Original Length: {testString.length}</p>
      <p>fflate Compressed Length: {fflateCompressed.length}</p>
      <QRCode value={fflateCompressed} size={260} /><br />
      
      <p>LZ-String Compressed Length: {lzStringCompressed.length}</p>
      <QRCode value={lzStringCompressed} size={260} /><br /> 
      
      <p>Pako Compressed Length: {pakoCompressed.length}</p>
      <QRCode value={pakoCompressed} size={260} /><br />
      
      <p>React ZLib Compressed Length: {zlibCompressed.length}</p>
      <QRCode value={zlibCompressed} size={260} /><br />

      <div><pre>{testString}</pre></div>
      
    </>
  );
};

export default App;