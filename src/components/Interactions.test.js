import React from 'react';
import Likes from './Likes';
import Comments from './Comments';
import Interactions from './Interactions';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<Interactions />', () => {
    it('Renders <Interactions /> component properly', () => {
        const likesArray = 
            ['admin@website.com', 'green@colors.com', 'white@colors.com', 'yellow@colors.com'];
        const user = { displayName: 'John Doe', email: 'white@colors.com'};
        const likeArticleFn = () => {};
        const addCommentActionFn = () => {};
        const interactions = shallow(
        <Interactions 
            addCommentAction={addCommentActionFn}
            count={7}
            isClickable={true}
            likes={likesArray}
            likeArticle={likeArticleFn}
            user={user} />
        );
        
        expect(interactions.find('.interactions').exists()).toBe(true);

        expect(interactions.find(Likes).exists()).toBe(true);
        expect(interactions.find(Likes).props().likes).toEqual(likesArray);
        expect(interactions.find(Likes).props().user).toEqual(user);
        expect(interactions.find(Likes).props().isClickable).toEqual(true);
        expect(interactions.find(Likes).props().likeArticle).toEqual(likeArticleFn);
        expect(interactions.find(Likes).props().count).toEqual(undefined);

        expect(interactions.find(Comments).exists()).toBe(true);
        expect(interactions.find(Comments).props().count).toEqual(7);
        expect(interactions.find(Comments).props().addCommentAction).toEqual(addCommentActionFn);
        expect(interactions.find(Comments).props().wrongProp).toEqual(undefined);

    });
});