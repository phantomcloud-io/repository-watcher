import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import * as github from '@actions/github';
import * as protectionConfig from '../../config.json';


const repositoryWatcher = async (event) => {  
    const { repository, sender } = event.body;
    const repo = repository.name;
    const owner = repository.owner.login;
    const username = sender.login;
  
    try {
      await updateRepository(repo, owner, username)
    } catch (err) {
      console.log(err);
      return formatJSONResponse({
        message: `Oops, something went wrong`,
        event,
      });
    }
}
	
const updateRepository = async (repo, owner, username) => {
  const config = {
    owner,
    repo,
    ...protectionConfig,
  }

  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  const protection = await octokit.rest.repos.updateBranchProtection(config);

  if(protection.status == 200){
    await octokit.rest.issues.create({
      owner: owner,
      repo: repo,
      title: "Added Branch Protections",
      body: `We have added Branch Protection to the default branch ${protectionConfig.branch}
      cc: @${username}`,
    });
  }else{
    console.log(protection)
    return formatJSONResponse({
      message: `Oops, something went wrong when creating Branch Protection`,
    });
  }

  return formatJSONResponse({
    message: `Protection has been added for Repository: ${repo} and issue tagging ${username}`,
  });

}


export const main = middyfy(repositoryWatcher);
