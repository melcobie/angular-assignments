import { environment } from "src/environments/environment";

const fileUrl = (name?: string) => {
    return environment.assetsUri + "/images/" + name;
}

export {
    fileUrl,
}