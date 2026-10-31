class Solution {
public:
    int uniquePaths(vector<vector<int>>& grid) {
        const int MOD = 1e9 + 7;
        int m = grid.size(), n = grid[0].size();
        // dp[i][j][0]: arrived at (i,j) moving right; dp[i][j][1]: arrived moving down
        vector<vector<array<int, 2>>> dp(m, vector<array<int, 2>>(n, {0, 0}));

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    long long total = (i == 0 && j == 0)
                        ? 1
                        : ((long long)dp[i][j][0] + dp[i][j][1]) % MOD;
                    if (total == 0) continue;
                    if (j + 1 < n) dp[i][j + 1][0] = (dp[i][j + 1][0] + total) % MOD;
                    if (i + 1 < m) dp[i + 1][j][1] = (dp[i + 1][j][1] + total) % MOD;
                } else {
                    // entered moving right -> reflected down
                    if (i + 1 < m)
                        dp[i + 1][j][1] = (dp[i + 1][j][1] + dp[i][j][0]) % MOD;
                    // entered moving down -> reflected right
                    if (j + 1 < n)
                        dp[i][j + 1][0] = (dp[i][j + 1][0] + dp[i][j][1]) % MOD;
                }
            }
        }
        return ((long long)dp[m - 1][n - 1][0] + dp[m - 1][n - 1][1]) % MOD;
    }
};