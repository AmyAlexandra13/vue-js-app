import http from "../http-common"

class TutorialDataService{
    getAll()
    {
        return http.get("/tutorials");
    }

    get(id)
    {
        return http.get(`/tutorials/${id}`);
    }

    create(data)
    {
        // return http.post(`/tutorials/${data}`);
        return http.post(`/tutorials/`, data);

    }

    update(id, data)
    {
        return http.put(`/tutorials/${id}`, data);
    }


    deleteAll()
    {
        return http.delete(`/tutorials`);
    }


    delete(id)
    {
        return http.delete(`/tutorials/${id}`);
    }

    findByTitle(title)
    {
        return http.get(`/tutorials?title=${title}`);
    }

}

export default new TutorialDataService();