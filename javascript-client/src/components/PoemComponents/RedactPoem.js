import React from 'react';

export const RedactPoem = (poem) => {
  let arr = poem.split(' ');
  let output = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 5 === 0) {
      output.push(arr[i]);
    } else {
      output.push(`<span class='redacted'>` + arr[i] + '</span>');
    }
  }
  return output.join(' ');
};

export const RedactAll = (poem) => {
  let arr = poem.split(' ');
  let output = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 1 === 0 || i % 2 === 0) {
      output.push(`<span class='redacted-all'>` + arr[i] + '</span>');
    }
  }
  return output.join(' ');
};
