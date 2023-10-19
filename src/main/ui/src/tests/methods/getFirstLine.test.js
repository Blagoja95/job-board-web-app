import {getFirstLine} from "../../components/UserShort";

describe('Get first sentence from string of sentences', () => {

    it('Empty', () => {
        expect(getFirstLine()).toStrictEqual('')
    });

    const sentences = 'This is random? Random sentence, made straight out of my head!'
    it('Get first sentence', () => {
        expect(getFirstLine(sentences)).toStrictEqual('This is random?');
    });

    const long = 'Long sentence aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaa? Hello there.'
    it('Long sentence', () => {
        expect(getFirstLine(long)).toStrictEqual('Long sentence aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaa  ...');
    });
});