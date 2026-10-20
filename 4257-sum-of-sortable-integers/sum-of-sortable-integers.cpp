class Solution {
public:
    int sortableIntegers(vector<int>& nums) {
        int n = nums.size();
        int ans = 0;

        for (int k = 1; k <= n; k++) {
            if (n % k != 0) continue;

            bool ok = true;

            for (int i = 0; i < n; i += k) {
                int descents = 0;

                for (int j = i; j < i + k - 1; j++) {
                    if (nums[j] > nums[j + 1]) {
                        descents++;
                    }
                }

                if (descents > 1) {
                    ok = false;
                    break;
                }
            }

            if (ok) {
                // Check whether rotations can make the entire
                // array non-decreasing.
                vector<int> result;

                for (int i = 0; i < n; i += k) {
                    int start = i;

                    for (int j = i; j < i + k - 1; j++) {
                        if (nums[j] > nums[j + 1]) {
                            start = j + 1;
                            break;
                        }
                    }

                    for (int j = 0; j < k; j++) {
                        result.push_back(nums[i + (start - i + j) % k]);
                    }
                }

                for (int i = 1; i < n; i++) {
                    if (result[i] < result[i - 1]) {
                        ok = false;
                        break;
                    }
                }
            }

            if (ok) ans += k;
        }

        return ans;
    }
};