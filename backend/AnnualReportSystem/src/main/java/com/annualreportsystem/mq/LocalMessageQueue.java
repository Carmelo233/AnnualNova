package com.annualreportsystem.mq;

import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

/**
 * 本地基于内存的消息队列
 * @param <T>
 */
@Component
public class LocalMessageQueue<T> implements MessageQueue<T>{
    private final Queue<T> queue = new LinkedList<>();

    @Override
    public void enqueue(T message) {
        queue.add(message);
    }

    @Override
    public T dequeue() {
        return queue.poll();
    }

    @Override
    public T peek() {
        return queue.peek();
    }

    @Override
    public boolean isEmpty() {
        return queue.isEmpty();
    }

    @Override
    public int size() {
        return queue.size();
    }
}
