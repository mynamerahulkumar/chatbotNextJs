export const config={
    runtime:'edge'
};

export default async function handler(req){
    try{
        const{message}= await req.json();
        console.log('message',message);
    }
    catch(e){
        console.log('An error occurred in send message',e)
    }

}