
export const dateStampToDate = (stamp) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric'};
    const date = new Date(stamp);
    return date.toLocaleDateString('en-US', options);
}


function generateRandomString() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

// removes all special characters from the text and replaces spaces with dashes
// also adds a randomly genearated alfa-numeric string to the end (to achieve uniquness of the id)
// as a result we get an article id based on its title, 
// similar to article id url that Medium (https://medium.com/) creates
// example: should-you-start-a-blog-in-2018-PsPaG
export const titleToURL = (title) => {
    const random = generateRandomString();
    if (title.length > 150){
        return title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '-').substring(0, 150) + '-' + random;
    }
    return title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s/g, '-') + '-' + random; 
}

export const emailToIdentifier = (email) => {
    return email.replace(/@/g, '-').replace(/\./g,'-');
}