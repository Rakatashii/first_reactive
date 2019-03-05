package com.revature.reactive;

import io.reactivex.Observable;
import io.reactivex.functions.Predicate;

public class CreateMeths implements Predicate<Object> {
	private static Observable<String> source; 
	public static void init() {
		source = Observable.create(emitter -> {
			try {
				emitter.onNext("Alpha"); emitter.onNext("Beta");
				emitter.onNext("Delta"); emitter.onNext("Gamma");
				emitter.onNext("Rho");   emitter.onNext("Sigma");
				emitter.onNext("Kappa"); emitter.onNext("Tao");
				emitter.onNext("Omega"); emitter.onNext("Lambda");
				emitter.onNext("Pi");    emitter.onNext("Epsilon");
				emitter.onComplete();
			} catch (Exception e) {
				emitter.onError(e);
			}
		});
	}
	
	public static <T> Observable<?> filter(Predicate<? super String> predicate) {
		return source.filter(predicate);
	}
	
	public static void subscribe() {
		source.subscribe(s -> System.out.println("RECEIVED: " + s), Throwable::printStackTrace);
	}

	@Override
	public boolean test(Object t) throws Exception {
		return false;
	}
}
