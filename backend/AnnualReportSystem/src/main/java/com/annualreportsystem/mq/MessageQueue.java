package com.annualreportsystem.mq;

public interface MessageQueue<T> {
    void enqueue(T message);       // 将消息入队
    T dequeue();                   // 消费队列头部的消息并从队列中移除
    T peek();                      // 查看队列头部的消息但不移除
    boolean isEmpty();             // 检查队列是否为空
    int size();                    // 返回队列中的消息数量
}
