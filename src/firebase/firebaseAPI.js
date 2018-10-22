import firebase, { auth, provider } from './firebaseInit.js';
import { emailToIdentifier } from '../helpers';

export const userLogin = async() => {
    return auth.signInWithPopup(provider) 
        .then((result) => {
            saveUserInfo(result.user);
            return result.user;
        });
}

export const userLogout = () => {
    return auth.signOut()
        .then(() => {
            return null;
        });
}

// check if user logged in on page refresh
export const checkLogin = (func) => {
    return auth.onAuthStateChanged(func);
};

export const isUserAdmin = async (user) => {
    if (!user) {
        return false;
    }

    return firebase.database().ref('admin').once('value')
            .then(function(snapshot) {
                const adminValue = snapshot.val();
                if (adminValue === user.email){
                    return true;
                }
                return false;
            }
        );
}

export const getArticles = (searchQuery = '', dispatch, getArticleListAction) => {
    const articlesRef = firebase.database().ref('articles').orderByChild('date');
    articlesRef.on('value', (snapshot) => {
        const articles = [];
        const existingArticles = snapshot.val();  // firebase returns 'existingArticles' as json object (not array)   
        
        for (let article in existingArticles){
            const id = article;
            const { id: articleId, date, isActive, title, text, tags } = existingArticles[article];
            articles.push({ articleId, id, date, isActive, title, text, tags });
        }

        const sortedArticles = articles
            .filter(item => 
                item.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.tags.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => b.date - a.date);
        // dispatch 'articles' array to redux store by calling it as a callback function
        return dispatch(getArticleListAction(sortedArticles));
    });
}

export const addArticle = (article, dispatch, addArticleAction) => {
    let result = null;
    const articlesRef = firebase.database().ref('articles/');

    let newArticle = articlesRef.push();

    const { date, title, text, id, userEmail, tags, isActive } = article;
    newArticle.set({ date, title, text, id, userEmail, tags, isActive },
        (error) => {
            if (error){
                result = 1;
            } 
            else{
                result = 0;
            }
            dispatch(addArticleAction(result));
            window.setTimeout(function(){dispatch(addArticleAction(null))}, 2000);
        }
    );
}

export const deleteArticle = (articleId) => {
    const articlesRef = firebase.database().ref(`articles/${articleId}`);
    articlesRef.set(null);
}

// add user profile info to DB once user logged in (or update if already exists)
// this is needed to display author (avatar, name) of the comment
export const saveUserInfo = (user) => {
    if (!user) {
        return null;
    }
    
    const usersRef = firebase.database().ref('users');
    const identifier = emailToIdentifier(user.email); 

    const userObject = {email: user.email, photoURL: user.photoURL, displayName: user.displayName};
    usersRef.child(identifier).set(userObject);
}

export const getArticleDetails = (articleId, dispatch, getArticleDetailsAction) => {
    const articleRef = firebase.database().ref('articles').orderByChild('id').equalTo(articleId);
    articleRef.on('value', (snapshot) => {
        let article = {};
        const existingArticles = snapshot.val();  
      
        
        for (let oneArticle in existingArticles){
            const id = oneArticle;
            const { id: articleId, date, isActive, title, text, tags } = existingArticles[oneArticle];
            article = { articleId, id, date, isActive, title, text, tags };
        }
      
        return dispatch(getArticleDetailsAction(article));
    });
}

export const getArticleComments = (articleId, dispatch, getArticleCommentsAction) => {

    const promises = [];
    const commentsRef = firebase.database().ref('comments').orderByChild('articleId').equalTo(articleId);
    commentsRef.on('value', (snapshot) => {

        const articleComments = [];

        const comments = snapshot.val();  
        for (let oneComment in comments){
            const comment = comments[oneComment];
            const { articleId, date, text, userEmail } = comment;
            
            const userRef = firebase.database().ref('users').orderByChild('email').equalTo(userEmail);
            const promise = userRef.once('value', (snapshot) => {
                const user = snapshot.val()[emailToIdentifier(userEmail)];  
                const { displayName, photoURL } = user;

                articleComments.push({ articleId, date, text, userEmail, displayName, photoURL });
                return articleComments.sort((a, b) => b.date - a.date);
            });
            promises.push(promise);
        }

        Promise.all(promises)
            .then(() => {
                dispatch(getArticleCommentsAction( articleComments ));
            });
    });
}

export const addComment = (comment, dispatch, addArticleCommentAction) => {
    let result = null;
    const commentsRef = firebase.database().ref('comments/');

    let newComment = commentsRef.push();

    const { articleId, date, text, userEmail } = comment;
    return newComment.set(
        { articleId, date, text, userEmail }, 
        (error) => {
            if (error){
                result = 1;
            } 
            else{
                result = 0;
            }
            dispatch(addArticleCommentAction(result));
            window.setTimeout(function(){dispatch(addArticleCommentAction(null))}, 2000);
        }
    );
}

export const editArticle = (id, article, dispatch, editArticleAction) => {
    let result = null;
    const articleRef = firebase.database().ref(`articles/${id}`);

    let updatedArticle = article;

    articleRef.set(updatedArticle,
        (error) => {
            if (error){
                result = 1;
            } 
            else{
                result = 0;
            }
            dispatch(editArticleAction(result));
            window.setTimeout(function(){dispatch(editArticleAction(null))}, 2000);
        }
    );
}