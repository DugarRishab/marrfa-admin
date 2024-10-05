import React, { useState, useEffect } from "react";
import { Button, message } from "antd";

// const [messageApi, contextHolder] = message.useMessage();

const alert = (text, type) => {
	if (type === 'info') message.info(text);
	else if (type === 'error') message.error(text);
	else if (type === 'success') message.success(text);
	else message.error('INVALID MESSAGE TYPE');

	// message.success(text);
	// message.open(text, type);
};

export default alert;
