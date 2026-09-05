class Solution {
public:
    int firstStableIndex(vector<int>& nums, int k) {
        int n = nums.size();

        vector<long long> sufMin(n);
        sufMin[n - 1] = nums[n - 1];

        for (int i = n - 2; i >= 0; --i) {
            sufMin[i] = min(sufMin[i + 1], (long long)nums[i]);
        }

        long long prefMax = 0;

        for (int i = 0; i < n; ++i) {
            prefMax = max(prefMax, (long long)nums[i]);

            if (prefMax - sufMin[i] <= k) {
                return i;
            }
        }

        return -1;
    }
};