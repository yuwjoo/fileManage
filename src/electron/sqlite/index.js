const { api, db } = require("./database");

db.serialize(() => {
//   api.addTypes({ title: "工具", directory: "utils1" });

//   api.getTypesList().then((res) => {
//     console.log(res);
//   });

  api.deleteResource(2);

  api.getResourceList().then((res) => {
    console.log(res);
  });
});
