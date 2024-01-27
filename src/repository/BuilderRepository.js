import Repository from "./Repository";
const PROFILESTATEMENT = "/profile/suggest-summary";
const EMPLOYMENTDESCRIPTION = "/profile/suggest-roles-responsibilities";
const SKILLDESCRIPTION = "/profile/skill-responsibilities"
export default {
    getProfileStatement(jobTitle) {
        return Repository.post(`${PROFILESTATEMENT}`, jobTitle);
    },
    getEmploymentDescription(detail) {
        return Repository.post(`${EMPLOYMENTDESCRIPTION}`, detail);
    },
    getSkillDescription(skillTitle) {
        return Repository.post(`${SKILLDESCRIPTION}`, skillTitle);
    },
};
