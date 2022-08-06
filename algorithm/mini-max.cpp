/**
 *	 Code by b21
**/

#include <bits/stdc++.h>

using namespace std;

vector<int64_t> arr;
int64_t sum = 0;

void enter()
{
    for (int i = 0; i < 5; ++ i) {
        int64_t x;
        cin >> x;
        arr.emplace_back(x);
    }
}

void solve()
{
    sort (arr.begin(), arr.end());
    for (int64_t& x : arr) {
        sum += x;    
    }

}

void printResult()
{
    cout << sum - arr[4] << " " << sum - arr[0];
}

void bonus()
{
    cout << "\nTotal sum of array: " << sum;
    cout << "\nMin element in array: " << arr[0];
    cout << "\nMax element in array: " << arr[4];
    cout << "\nEven elements in array: ";
    for (int64_t& x : arr) {
        if (x % 2 == 0) {
            cout << x << " ";
        }
    }
    cout << "\nOdd elements in array: ";
    for (int64_t& x : arr) {
        if (x % 2 == 1) {
            cout << x << " ";
        }
    }
}

int main()
{
    freopen("mini-max.inp", "r", stdin);
    freopen("mini-max.out", "w", stdout);
    enter();
    solve();
    printResult();
    bonus();
}