import sum from "../../testExamples/sum/sum";
// console.log(sum.default())
test("2 + 2", () => {
	expect(sum(2, 2)).toBe(4)
});

test("3 + 2", () => {
	expect(sum(3, 2)).toBe(5)
});

test("-2 + 2", () => {
	expect(sum(-2, 2)).toBe(0)
});

test("null + 2", () => {
	expect(sum(null, 2)).toBe(2);
});

test("null + (-2)", () => {
	expect(sum(null, -2)).toBe(-2);
});

it("undefined + 2", () => {
	expect(sum(undefined, 2)).toBe(NaN)
});