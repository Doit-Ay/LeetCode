class Solution {
public:
    bool uniformArray(vector<int>& nums1) {
        long long minOdd = LLONG_MAX;
        
        for (int x : nums1) {
            if (x & 1) minOdd = min(minOdd, (long long)x);
        }

        auto canMake = [&](int targetParity) {
            for (int x : nums1) {
                int p = x & 1;

                if (p == targetParity) continue; // use nums1[i] itself

                // To flip parity, we need an odd number smaller than x.
                if (minOdd == LLONG_MAX || minOdd >= x)
                    return false;
            }
            return true;
        };

        return canMake(0) || canMake(1);
    }
};