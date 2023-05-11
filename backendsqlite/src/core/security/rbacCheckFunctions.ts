import { CustomRequest } from '../../adapters/driving/types/CustomRequest';

const isValidUser = (req: CustomRequest) => !!req.user;
const ownsActivity = async (req: CustomRequest) => {
  const activityId = parseInt(req.params.id);
  const activity = await req.context.services.activityRepository.getById(
    activityId
  );
  return req.user.id === activity?.userId;
};
const ownsOrRegisteredForActivity = async (data: any) => {
  const activity =
    await data.context.services.activityRepository.getByUserIdAndActivityId(
      data.activityId,
      data.user.id
    );
  return !!activity;
};

export { isValidUser, ownsActivity, ownsOrRegisteredForActivity };
