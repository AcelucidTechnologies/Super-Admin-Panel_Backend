const AccessControl = require("accesscontrol");
const ac = new AccessControl();
exports.roles = (function () {
  ac.grant("user").readOwn("profile").updateOwn("profile").deleteOwn("profile").createOwn("profile");
  ac.grant("admin").readOwn("profile").updateOwn("profile").deleteOwn("profile").createOwn("profile");
  ac.grant("superAdmin")
    .extend("user")
    .readAny("profile")
    .readOwn("profile")
    .updateOwn("profile")
    .updateAny("profile")
    .deleteAny("profile")
    .createAny("profile");

  return ac;
})();
