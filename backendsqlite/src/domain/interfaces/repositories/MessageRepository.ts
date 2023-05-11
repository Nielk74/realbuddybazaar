import Message from '../../entities/Message';

interface MessageRepository {
  create(message: Message): Promise<Message | null>;
  getByActivityId(activityId: number): Promise<Message[]>;
}

export default MessageRepository;
