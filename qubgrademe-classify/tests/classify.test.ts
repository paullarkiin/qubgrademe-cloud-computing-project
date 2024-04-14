
import { classify } from '../classify';
import {describe, expect, test} from '@jest/globals';

test('testing that classify returns correct classification', () => {
    expect(classify(12,45,3,5,7)).toBe("Commendation");
  });