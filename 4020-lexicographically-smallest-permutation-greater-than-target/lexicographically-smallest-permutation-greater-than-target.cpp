class Solution {
public:
    string lexGreaterPermutation(string s, string target) {
        int n = s.size();

        // Frequency of characters in s
        vector<int> freq(26, 0);
        for (char c : s) {
            freq[c - 'a']++;
        }

        // Try the rightmost possible position where we can
        // make the answer strictly greater.
        for (int i = n - 1; i >= 0; i--) {

            // Remaining characters after using target[0...i-1]
            vector<int> cnt = freq;

            bool possible = true;

            // Use target[0...i-1] as the equal prefix
            for (int j = 0; j < i; j++) {
                int c = target[j] - 'a';

                if (cnt[c] == 0) {
                    possible = false;
                    break;
                }

                cnt[c]--;
            }

            if (!possible)
                continue;

            // At position i, find the smallest character
            // strictly greater than target[i].
            int need = target[i] - 'a';
            int bigger = -1;

            for (int c = need + 1; c < 26; c++) {
                if (cnt[c] > 0) {
                    bigger = c;
                    break;
                }
            }

            if (bigger == -1)
                continue;

            // Construct the answer
            string ans = target.substr(0, i);

            // Put the smallest possible greater character
            ans += char('a' + bigger);
            cnt[bigger]--;

            // Append all remaining characters in sorted order
            for (int c = 0; c < 26; c++) {
                while (cnt[c] > 0) {
                    ans += char('a' + c);
                    cnt[c]--;
                }
            }

            return ans;
        }

        return "";
    }
};