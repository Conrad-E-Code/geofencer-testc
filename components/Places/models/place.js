class Place {
    constructor(title, imageUri, address, location) {
        this.title = title
        this.imageUri = imageUri
        this.address = address
        this.location = location // {lat:111 lng:111}
        this.id = new Date().toString() + Math.random().toString()
    }

}