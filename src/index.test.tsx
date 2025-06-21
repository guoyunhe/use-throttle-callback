import { sleep } from '@guoyunhe/sleep';
import { renderHook } from '@testing-library/react';
import { useThrottleCallback } from '.';

test('throttle callback for 500ms (default)', async () => {
  const fn = vitest.fn();
  const { result } = renderHook(() => useThrottleCallback(fn));

  // first call, executed
  result.current();
  expect(fn).toBeCalledTimes(1);

  // within throttle period, skipped
  result.current();
  expect(fn).toBeCalledTimes(1);

  await sleep(500);

  // after throttle period, executed
  result.current();
  expect(fn).toBeCalledTimes(2);
});
