import {removeDuplicates} from "../../utils";

describe("Makes a set", () => {
    it("Testing removeDuplicate method", () => {
        const items1 = [null, 111, 'a', 'b', 'a', 'c', 'c', 'c', undefined];
        expect(removeDuplicates(items1)).toStrictEqual([null, 111, 'a', 'b', 'c', undefined]);

        const items2 = ['full time', 'full-time', 'remote', 'part-time', 'remote', 'hybrid'];
        expect(removeDuplicates(items2)).toStrictEqual(['full time', 'full-time', 'remote', 'part-time', 'hybrid']);

        const items3 = ["Laktasi", "Banja Luka", "Gradiska", "Banja Luka", "Trebinje", "Banja Luka"];
        expect(removeDuplicates(items3)).toStrictEqual(["Laktasi", "Banja Luka", "Gradiska", "Trebinje"])
    });
});
