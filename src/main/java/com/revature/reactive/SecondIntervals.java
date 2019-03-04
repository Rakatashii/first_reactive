package com.revature.reactive;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;

public class SecondIntervals {
	Observable<Long> intervals;
	public SecondIntervals() {
		this.intervals = Observable.interval(1, TimeUnit.SECONDS);
	}
	
	public void subscribe() {
		this.intervals.subscribe(s -> System.out.println(s));
	}
	
	static void sleep(Long ms) {
		try {
			Thread.sleep(ms);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			e.printStackTrace();
		}
	}
}
