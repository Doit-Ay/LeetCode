class Solution {
public:
    int minOperations(vector<int>& nums) {
        int n = nums.size();

        // BFS over all rotations in both orientations.
        // orientation 0: original array
        // orientation 1: reversed array
        vector<vector<int>> dist(2, vector<int>(n, -1));
        queue<pair<int, int>> q;

        dist[0][0] = 0;
        q.push({0, 0});

        while (!q.empty()) {
            auto [ori, k] = q.front();
            q.pop();

            int d = dist[ori][k];

            // Rotate left by one.
            int nk = (k + 1) % n;
            if (dist[ori][nk] == -1) {
                dist[ori][nk] = d + 1;
                q.push({ori, nk});
            }

            // Reverse the entire array.
            int nr = (n - k) % n;
            int no = 1 - ori;

            if (dist[no][nr] == -1) {
                dist[no][nr] = d + 1;
                q.push({no, nr});
            }
        }

        int ans = INT_MAX;

        // Check original orientation.
        int pos = 0;
        while (nums[pos] != 0) pos++;

        bool ok = true;
        for (int i = 0; i < n; i++) {
            if (nums[(pos + i) % n] != i) {
                ok = false;
                break;
            }
        }

        if (ok) {
            ans = min(ans, dist[0][pos]);
        }

        // Check reversed orientation.
        int rpos = n - 1 - pos;
        ok = true;

        for (int i = 0; i < n; i++) {
            int idx = (rpos + i) % n;
            if (nums[n - 1 - idx] != i) {
                ok = false;
                break;
            }
        }

        if (ok) {
            ans = min(ans, dist[1][rpos]);
        }

        return ans == INT_MAX ? -1 : ans;
    }
};