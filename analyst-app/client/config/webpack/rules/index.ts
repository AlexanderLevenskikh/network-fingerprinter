import { RuleSetCondition } from "webpack";

export interface IWebpackRuleCreatorArgs {
    include?: RuleSetCondition;
    exclude?: RuleSetCondition;
}
