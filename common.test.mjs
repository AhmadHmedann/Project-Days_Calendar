import { numberOfDaysInMonth, state, incrementMonth  } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("Math: February 2024 should have 29 days (Leap Year)", () => {
  //1.ARRANGE our data
  const year  = 2024;
  const month = 2;
  const expectedDays = 29;

  //2.ACT 
  const actualDays = numberOfDaysInMonth({ year, month });

  3.//ASSERT
  assert.strictEqual(actualDays, expectedDays, "leap year feb 2024 should be 29");

});

test("State: incrementMonth should wrap from December to January", () => {
  //1.ARRANGE our data
  state.currentDate.year = 2026;
  state.currentDate.month = 12;


  //2.ACT 
  incrementMonth()

  3.//ASSERT
  assert.strictEqual( state.currentDate.month, 1, "Should wrap to January");
  assert.strictEqual( state.currentDate.year, 2027, "Should increment the year");



});

