import { useNotification } from '@/providers/NotificationProvider';

export default (queue: Array<{ message: string; code: number; data: any }> = [], duration = 1) => {
  const notification = useNotification();
  const messageQueue = {
    queue,
    duration,
    queueing: false,
  };

  const pushQueue = (data: any) => {
    messageQueue.queue.push(data);
    update();
  };

  const update = () => {
    if (!messageQueue.queueing) {
      next();
    }
  };

  const clear = () => {
    messageQueue.queue = [];
  };

  const next = () => {
    if (messageQueue.queue.length) {
      messageQueue.queueing = true;
      const data = messageQueue.queue.shift();
      notification.error({
        duration: messageQueue.duration,
        message: data?.message,
        onClose: () => {
          if (data?.code === -999 || data?.code === -998) {
            clear();
          } else {
            next();
          }
        },
      });
    } else {
      messageQueue.queueing = false;
    }
  };

  return {
    pushQueue,
  };
};
