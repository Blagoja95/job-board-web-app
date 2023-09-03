import renderer from 'react-test-renderer';
import Link from '../../testExamples/link/Link';

describe("TestExamples", () => {
	describe("Link", () => {
		it('Class is changed when hovered', () => {
			const cmp = renderer.create(
				<Link page="http://www.facebook.com">Facebook</Link>,
			);

			let tree = cmp.toJSON();
			expect(tree).toMatchSnapshot();

			renderer.act(() => {
				tree.props.onMouseEnter();
			});

			tree = cmp.toJSON();
			expect(tree).toMatchSnapshot();

			renderer.act(() => {
				tree.props.onMouseLeave();
			});

			tree = cmp.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});
