
export const userDataLayer = {
    // Data
    uid: "4oEsjBBDA2yxz4nItBbY",
    displayName: "", 
    starRating: 0, 
    numberOfFriends: 0, 
    numberOfGroups: 0,
    profilePicUrl: "",
    email: "",
    favoriteColor: "rgb(154, 140, 201)",

    // Getters
    getUserData: () => {
        return userDataLayer;
    },

    // Setters
    setAll: (newData: any) => {
        userDataLayer.uid = newData.uid;
        userDataLayer.displayName = newData.displayName;
        userDataLayer.starRating = newData.starRating;
        userDataLayer.numberOfFriends = newData.numberOfFriends;
        userDataLayer.numberOfGroups = newData.numberOfGroups;
        userDataLayer.favoriteColor = newData.favoriteColor;
    },
    setUID: (newValue: string) => {
        userDataLayer.uid = newValue;
    },
    setDisplayName: (newValue: string) => {
        userDataLayer.displayName = newValue;
    },
    setStarRating: (newValue: number) => {
        userDataLayer.starRating = newValue;
    },
    setNumberOfFriends: (newValue: number) => {
        userDataLayer.numberOfFriends = newValue;
    },
    setNumberOfGroups: (newValue: number) => {
        userDataLayer.numberOfGroups = newValue;
    },
    setFavoriteColor: (newValue: string) => {
        userDataLayer.favoriteColor = newValue;
    }
}