package com.tns.gen.android.app;

public class DatePickerDialog_OnDateSetListener implements android.app.DatePickerDialog.OnDateSetListener {
	public DatePickerDialog_OnDateSetListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onDateSet(android.widget.DatePicker param_0, int param_1, int param_2, int param_3)  {
		java.lang.Object[] args = new java.lang.Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		com.tns.Runtime.callJSMethod(this, "onDateSet", void.class, args);
	}

}
