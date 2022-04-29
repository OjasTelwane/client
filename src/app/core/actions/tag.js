import axios from "axios";

class TagDataService {

    // Create a Single Tag
    createTag (newTag) {
        return axios.post('tags', newTag);
    }

    // Add multiple Tags in Batch
    createTagsBatch (newTagsArray) {
        return axios.post('tags/addBatch', newTagsArray);
    }

    // Update a Single Tag
    updateTag (id, updatedTag) { 
        return axios.put(`tags/${id}`, updatedTag);
    }

    // Delete a Single Tag
    deleteTag (id) {
        return axios.delete(`tags/${id}`);
    }

    // Get a Single Tag by Tag Id
    getTag (id) {
        return axios.get(`tags/${id}`);
    }

    getQueryString(tag, tagType, page=0, size=8) {
        if(tag!==undefined && tag.trim() !== ''){
            tag = tag.trim();
        }
        if(tagType !== undefined && tagType.trim() !== ''){
            tagType = tagType.trim();
        }
        var search='';
        if(tag!==undefined && tag !== ''){
            search = search + '&tag=' + tag;
        }
        if(tagType !== undefined && tagType !== ''){
            search = search + '&tagType=' + tagType;
        }
        search = search + '&page=' + page;
        search = search + '&size=' + size;
        if(search !== '') {
            search = '?' + search;
        }
        return search;
    }

    // Get all Tags
    getAllTags (tag, tagType) {
        var search = this.getQueryString(tag, tagType);
        return axios.get(`tags${search}`);
    }


    // Get all Tags by Page 
    getTagsByPage ( page=0, size=8, tag, tagType) {
        var search = this.getQueryString(tag, tagType, page, size);
        console.log('search:', search);
        return axios.get(`tagsByPage${search}`);
    }

}

export default new TagDataService();

