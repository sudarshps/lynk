import ArticleModel from "../model/article_model.js";

class ArticleController {
    constructor(){}
    async create(req,res){
        try {
            const{title,description,image,tags,selectedCategories} = req.body
            const userId = req.user._id
            let articleData = {
                title,
                description,
                image,
                tags,
                category:selectedCategories,
                userId
            }
            const article = new ArticleModel(articleData)
            const isArticleCreated = await article.save()
            if(!isArticleCreated){
                return res.status(500).json({articleCreated:false,message:'Error while creating article'})
            }
            return res.status(200).json({articleCreated:true,message:'Article created'})
        } catch (error) {
            console.error('error while creating article',error);
            return res.status(500).json({articleCreated:false,message:'Error while creating article'})
        }
    }

    async fetchArticles(req,res){
        try {
            const userPreference = req.user.preference
            const articles = await ArticleModel.find({category:{$in:userPreference}})
            if(!articles){
                return res.status(500).json({message:'Failed to fetch data'})
            }
            return res.status(200).json({articles,message:'Data fetched successfully'})
        } catch (error) {
            console.error('error while fetching articles',error);
            return res.status(500).json({message:'Error while fetching article'})
        }
    }
    async fetchUserArticles(req,res){
        try {
            const userId = req.user._id
            const articles = await ArticleModel.find({userId})
            if(!articles){
                return res.status(500).json({message:'error while fetching user articles'})
            }
            return res.status(200).json({articles,message:'data fetched successfully!'})
        } catch (error) {
            console.error('error while fetching article',error);
            return res.status(500).json({articleCreated:false,message:'Error while fetching article'})
            
        }
    }

    async getEditUserArticle(req,res){
        try {
            const{id} = req.params
            const article = await ArticleModel.findById(id)
            if(!article){
                return res.status(500).json({message:'error while fetching user articles'})
            }
            return res.status(200).json({article,message:'data fetched successfully!'})

        } catch (error) {
            console.error('error while fetching article',error);
            return res.status(500).json({articleCreated:false,message:'Error while fetching article'})
        }
    }

    async editUserArticle(req,res){
        try {
            const{id} = req.params
            const{title,description,image,tags,selectedCategories} = req.body
            let articleData = {
                title,description,image,tags,selectedCategories
            }
            const article = await ArticleModel.findByIdAndUpdate(id,articleData)
            if(!article){
                return res.status(500).json({message:'error while editing user articles'})
            }
            return res.status(200).json({article,message:'data edited successfully!'})

        } catch (error) {
            console.error('error while editing article',error);
            return res.status(500).json({articleCreated:false,message:'Error while editing article'})
        }
    }

    async deleteArticle(req,res){
        try {
            const{id} = req.params
            const deletedArticle = await ArticleModel.findByIdAndDelete(id)
            if(!deletedArticle){
                return res.status(500).json({message:'error while deleting user articles'})

            }
            return res.status(200).json({message:'Deletion successful!'})
        } catch (error) {
            console.error('error while deleting article',error);
            return res.status(500).json({message:'Error while deleting article'})
        }
    }
}

 
export default new ArticleController()