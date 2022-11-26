import axios from "axios";

export default {
  getGithubUser: async (user: string) => {
    try{
      const { data }: any = await axios.get(
        `https://api.github.com/users/${user}`
      );
      return data;
    }catch(error){
      throw new Error("Sorry, we couldn't find in this user in github.")
    }
  },
};
