import { render, screen } from '@testing-library/react';
import {match} from './Container';

describe("google search test without quotes on post 1", () => {
  it("returns true if matched", () => {
    const result = match({
      "name": "The Lord of the Rings: The Return of the King",
      "description": ""
    },"the king");
    const expectedResult = true;
    expect(result).toEqual(expectedResult);
  });
});
describe("google search test with quotes on post 1", () => {
  it("returns true if matched", () => {
    const result = match({
      "name": "The Lord of the Rings: The Return of the King",
      "description": ""
    },"\"the king\"");
    const expectedResult = true;
    expect(result).toEqual(expectedResult);
  });
});

describe("google search test without quotes post 2", () => {
  it("returns true if matched", () => {
    const result = match({
      "name": "The Lion King",
      "description": ""
    },"the king");
    const expectedResult = true;
    expect(result).toEqual(expectedResult);
  });
});

describe("google search test with quotes post 2", () => {
  it("returns true if matched", () => {
    const result = match({
      "name": "The Lion King",
      "description": ""
    },"\"the king\"");
    const expectedResult = false;
    expect(result).toEqual(expectedResult);
  });
});

describe("the king in description test", () => {
  it("returns true if matched", () => {
    const result = match({
      "name":"",
      "description": "Vitae dolor natus aut aut. Totam dolor porro. Rem est repellendus voluptas eos soluta. The Lord of the Rings: The Return of the King"
    },"\"the king\"");
    const expectedResult = true;
    expect(result).toEqual(expectedResult);
  });
});
