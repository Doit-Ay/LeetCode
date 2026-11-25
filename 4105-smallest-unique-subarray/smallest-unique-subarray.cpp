
class Solution {
public:
    int smallestUniqueSubarray(vector<int>& nums) {
        int n = nums.size();

        // Step 1: Build Suffix Array
        vector<int> sa(n), rank(n), temp(n);

        iota(sa.begin(), sa.end(), 0);

        for (int i = 0; i < n; i++) {
            rank[i] = nums[i];
        }

        for (int len = 1; len < n; len *= 2) {

            sort(sa.begin(), sa.end(), [&](int a, int b) {
                if (rank[a] != rank[b])
                    return rank[a] < rank[b];

                int ra = (a + len < n) ? rank[a + len] : -1;
                int rb = (b + len < n) ? rank[b + len] : -1;

                return ra < rb;
            });

            temp[sa[0]] = 0;

            for (int i = 1; i < n; i++) {
                int a = sa[i - 1];
                int b = sa[i];

                bool different =
                    rank[a] != rank[b] ||
                    (a + len < n ? rank[a + len] : -1) !=
                    (b + len < n ? rank[b + len] : -1);

                temp[b] = temp[a] + different;
            }

            rank = temp;

            if (rank[sa[n - 1]] == n - 1)
                break;
        }

        // Step 2: Build inverse suffix array
        vector<int> pos(n);

        for (int i = 0; i < n; i++) {
            pos[sa[i]] = i;
        }

        // Step 3: Calculate LCP using Kasai's algorithm
        vector<int> lcp(n, 0);

        int h = 0;

        for (int i = 0; i < n; i++) {
            int r = pos[i];

            if (r == 0) {
                h = 0;
                continue;
            }

            int j = sa[r - 1];

            while (i + h < n &&
                   j + h < n &&
                   nums[i + h] == nums[j + h]) {
                h++;
            }

            lcp[r] = h;

            if (h > 0)
                h--;
        }

        // Step 4: Find minimum unique subarray length
        int ans = n;

        for (int i = 0; i < n; i++) {
            int r = pos[i];

            int maxLCP = lcp[r];

            if (r + 1 < n) {
                maxLCP = max(maxLCP, lcp[r + 1]);
            }

            int required = maxLCP + 1;

            // Check whether the unique subarray fits
            if (required <= n - i) {
                ans = min(ans, required);
            }
        }

        return ans;
    }
};
