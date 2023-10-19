import {getUserInitial} from "../../components/UserShort";

describe('Metod get first letter of users name', () => {

    it('No input', () => {
        expect(getUserInitial()).toStrictEqual('E');
    });

    it('Empty string', () => {
        expect(getUserInitial('')).toStrictEqual('E');
    });

    it('Null value', () => {
        expect(getUserInitial(null)).toStrictEqual('E');
    });

    it('Name capitalized', () => {
        expect(getUserInitial('Boris')).toStrictEqual('B');
    });

    it('first name all lower', () => {
        expect(getUserInitial('boris')).toStrictEqual('B');
    });

    it('full name', () => {
        expect(getUserInitial('marko markovic')).toStrictEqual('M');
    });

    it('full name camel case', () => {
        expect(getUserInitial('nemanjaNemanjic')).toStrictEqual('N');
    });
});
