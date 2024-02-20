import CookiePopup from "./CookiePopup";
import renderer from "react-test-renderer";

describe('CookiePopup', () =>
{
	let cmp;
	let tree;

	beforeEach(() =>
	{
		cmp = renderer.create(<CookiePopup/>);
	});

	afterEach(()=> {

	});

	it('is hidden', () =>
	{
		tree = cmp.toJSON();
		expect(tree).toMatchSnapshot();
		expect(tree.props.className).toStrictEqual('fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 hidden')
	});

	it('Hide cookie banner', () =>
	{
		tree = cmp.toJSON();

		// Now is visible
		expect(tree.props.className).toStrictEqual('fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 block')
		expect(JSON.parse(localStorage.getItem('cookieAccepted'))).toStrictEqual(null);

		// User accepted cookies;
		localStorage.setItem('cookieAccepted', 'true');
		renderer.act(() =>
		{
			cmp.root.findByProps({className: "bg-mint cookie-btn"}).props.onClick()
		});

		tree = cmp.toJSON();

		//Now is hidden
		expect(tree.props.className).toStrictEqual('fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 hidden')
	});
});