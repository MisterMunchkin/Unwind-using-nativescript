package com.tns.gen.okhttp3;

public class Callback implements okhttp3.Callback {
	public Callback() {
		com.tns.Runtime.initInstance(this);
	}

	public void onFailure(okhttp3.Call param_0, java.io.IOException param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onFailure", void.class, args);
	}

	public void onResponse(okhttp3.Call param_0, okhttp3.Response param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onResponse", void.class, args);
	}

}
