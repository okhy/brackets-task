const check = (string, bracketConfig) => {
  try {
    // empty string check
    if (!string.length) throw "oopsie";

    const charList = string.split("");
    let stack = []; // this also can be done with reduce instead

    // string iteration
    charList.forEach(char => {
      // get char type
      bracketConfig.forEach(configPair => {
        if (char === configPair[0]) {
          // left bracket - adding to the stack
          stack.push(char);
        }
        if (char === configPair[1]) {
          // right bracked
          if (stack[stack.length - 1] === configPair[0]) {
            // if previous matches - removing from the stack
            stack.pop();
          } else throw "oopsie"; // else - error - return false
        }
      });
    });
    if (stack.length > 0) throw "oopsie";
  } catch {
    return false;
  }
  return true;
};

// TESTING ZONE
const test = (fn, args, expectedValue) =>
  fn(...args) === expectedValue
    ? undefined
    : console.log(`failed with: '${args[0]}', and ${args[1]}`);

// tests
test(check, ["(ad)", [["(", ")"]]], true);
test(check, ["()", [["(", ")"]]], true);
test(check, ["((())())", [["(", ")"]]], true);
test(check, ["())(", [["(", ")"]]], false);
test(check, ["([{}])", [["(", ")"], ["[", "]"], ["{", "}"]]], true);
test(check, ["[]()", [["(", ")"], ["[", "]"]]], true);
// obviously wrong cases:
test(check, ["[(])", [["(", ")"], ["[", "]"]]], false);
test(check, [")))(((", [["(", ")"]]], false);
test(check, ["[]()(", [["(", ")"], ["[", "]"]]], false);
test(check, ["][]()[", [["(", ")"], ["[", "]"]]], false);
