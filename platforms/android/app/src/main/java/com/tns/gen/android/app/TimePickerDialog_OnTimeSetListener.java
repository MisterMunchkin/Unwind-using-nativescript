package com.tns.gen.android.app;

public class TimePickerDialog_OnTimeSetListener implements android.app.TimePickerDialog.OnTimeSetListener {
	public TimePickerDialog_OnTimeSetListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onTimeSet(android.widget.TimePicker param_0, int param_1, int param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onTimeSet", void.class, args);
	}

}
